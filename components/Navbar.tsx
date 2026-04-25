"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Command } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CalendlyPopup } from "@/components/calendly/CalendlyPopup";
import { CharacterLogo } from "@/components/ui/CharacterLogo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div className="wrap">
        <div
          className={cn(
            "flex h-14 items-center justify-between rounded-full px-4 transition-all duration-500 md:px-5",
            scrolled ? "glass" : "bg-transparent"
          )}
        >
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Home">
            <CharacterLogo size={34} />
            <span className="font-display text-sm font-semibold tracking-tight">
              {site.name}
            </span>
          </Link>

          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active =
                  pathname === item.href ||
                  (pathname?.startsWith(item.href) ?? false);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative inline-flex h-9 items-center rounded-full px-3.5 text-[13px] text-[color:var(--ink-dim)] transition-colors hover:text-[color:var(--ink)]",
                        active && "text-[color:var(--ink)]"
                      )}
                    >
                      {active && (
                        <span
                          className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.04]"
                          aria-hidden
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-cmdk"));
              }}
              className="hidden h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 text-[12px] text-[color:var(--ink-dim)] transition-colors hover:text-[color:var(--ink)] md:flex"
              aria-label="Open command menu"
            >
              <Command size={12} />
              <span className="mono">K</span>
            </button>
            <CalendlyPopup>
              <button
                type="button"
                className="hidden h-9 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-medium text-black transition-transform hover:-translate-y-px md:inline-flex"
              >
                Book a call
              </button>
            </CalendlyPopup>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {open && <MobileSheet onClose={() => setOpen(false)} />}
    </header>
  );
}

function MobileSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 top-[72px] z-40 md:hidden">
      <div className="wrap">
        <div className="glass rounded-2xl p-4">
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={onClose}
                  className="flex items-center justify-between border-b border-white/5 py-3 text-[15px] last:border-b-0"
                >
                  <span>{n.label}</span>
                  <span className="mono">↗</span>
                </Link>
              </li>
            ))}
          </ul>
          <CalendlyPopup>
            <button
              type="button"
              className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-white text-[13px] font-medium text-black"
            >
              Book a 30-min strategy call
            </button>
          </CalendlyPopup>
        </div>
      </div>
    </div>
  );
}

