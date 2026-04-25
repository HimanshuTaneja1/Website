"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-pad relative">
      <div className="wrap">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              The questions <span className="text-[color:var(--ink-dim)]">every serious client asks before the first call.</span>
            </>
          }
        />
        <div className="mt-10 divide-y divide-white/5 rounded-2xl border border-white/8 bg-white/[0.02]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
                  aria-expanded={isOpen}
                  data-cursor="hover"
                >
                  <span className="font-display text-[18px] font-medium tracking-[-0.01em]">
                    {f.q}
                  </span>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-[14px] leading-[1.65] text-[color:var(--ink-dim)]">
                      {f.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
