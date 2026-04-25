"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CalendlyPopup } from "@/components/calendly/CalendlyPopup";
import { Calendar } from "lucide-react";

export function FloatingBookCTA() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/book") return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <CalendlyPopup>
        <button
          type="button"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-white pl-4 pr-5 text-sm font-medium text-black shadow-[0_18px_60px_-10px_rgba(124,92,255,0.5)] transition-transform hover:-translate-y-0.5"
          data-cursor="hover"
          aria-label="Book a consult"
        >
          <Calendar size={16} />
          Book a consult
        </button>
      </CalendlyPopup>
    </div>
  );
}
