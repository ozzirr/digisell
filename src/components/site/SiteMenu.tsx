"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpenText, LayoutGrid, Menu, User, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";

import { products } from "@/data/products";

type SiteMenuProps = {
  isAuthenticated?: boolean;
  accentColor?: string;
};

export function SiteMenu({ isAuthenticated = false, accentColor = "#b96f62" }: SiteMenuProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Apri menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/72 text-[#211b17] shadow-[inset_0_0_0_1px_rgba(62,48,38,0.12)] transition hover:bg-white"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {open && mounted && createPortal(
        <>
          <div
            className="bg-[#211b17]/55 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
            style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, zIndex: 60 }}
          />
          <aside
            role="dialog"
            aria-label="Menu"
            className="flex flex-col overflow-y-auto shadow-[0_0_60px_rgba(33,27,23,0.25)]"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "24rem",
              zIndex: 70,
              backgroundColor: "#f8f2e8",
            }}
          >
            <div className="flex items-center justify-between px-5 pt-5">
              <Logo accentColor={accentColor} onClick={() => setOpen(false)} />
              <button
                type="button"
                aria-label="Chiudi menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/72 text-[#211b17] shadow-[inset_0_0_0_1px_rgba(62,48,38,0.12)] hover:bg-white"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-2 px-5">
              <MenuLink href="/" icon={<LayoutGrid className="h-5 w-5" aria-hidden />} onClick={() => setOpen(false)}>
                Home
              </MenuLink>
              <MenuLink
                href={"/catalogo" as React.ComponentProps<typeof Link>["href"]}
                icon={<BookOpenText className="h-5 w-5" aria-hidden />}
                onClick={() => setOpen(false)}
              >
                Catalogo workbook
              </MenuLink>
              {isAuthenticated && (
                <MenuLink
                  href="/dashboard"
                  icon={<User className="h-5 w-5" aria-hidden />}
                  onClick={() => setOpen(false)}
                >
                  La tua area personale
                </MenuLink>
              )}
            </nav>

            <div className="mt-8 px-5">
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#7a6c60]">Workbook</p>
              <ul className="mt-3 flex flex-col gap-2">
                {products.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-start gap-3 rounded-2xl bg-white/72 p-4 text-[#211b17] transition hover:bg-white"
                    >
                      <span
                        className="mt-1 h-3 w-3 shrink-0 rounded-full"
                        style={{ backgroundColor: p.accentColor }}
                        aria-hidden
                      />
                      <span>
                        <span className="block text-sm font-black leading-tight">{p.shortName}</span>
                        <span className="mt-1 block text-xs font-semibold leading-5 text-[#6f6257]">
                          {p.subtitle}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto px-5 pb-7 pt-6 text-xs font-semibold text-[#6f6257]">
              Workbook digitali per rimetterti al centro.
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}

function MenuLink({
  href,
  icon,
  children,
  onClick,
}: {
  href: React.ComponentProps<typeof Link>["href"];
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-2xl bg-white/72 px-4 py-4 text-base font-black text-[#211b17] transition hover:bg-white"
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
