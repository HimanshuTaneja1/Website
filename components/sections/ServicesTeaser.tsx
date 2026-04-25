"use client";

import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltCard } from "@/components/ui/TiltCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { CalendlyPopup } from "@/components/calendly/CalendlyPopup";

export function ServicesTeaser() {
  return (
    <section className="section-pad relative">
      <div className="wrap">
        <SectionHeader
          eyebrow="Services"
          title={
            <>
              Three ways to work with me — <span className="text-[color:var(--ink-dim)]">each engineered for compounding ROI.</span>
            </>
          }
          kicker="Every engagement starts with a free 30-minute consult so pricing fits your problem, not a template. Walk out with a firm, outcome-priced quote inside 48 hours."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((s) => (
            <TiltCard key={s.id}>
              <GlassCard className="flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <span className="mono">{s.badge} / {s.duration}</span>
                </div>
                <h3 className="mt-6 font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-[color:var(--ink-dim)] text-pretty">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2 text-[13px] text-[color:var(--ink-dim)]">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[color:var(--accent)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <div className="mono text-[10px] text-[color:var(--ink-dim)]">
                    {s.priceNote}
                  </div>
                  <CalendlyPopup>
                    <button
                      type="button"
                      className="group inline-flex items-center justify-between gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-2.5 text-[13px] text-white transition-all hover:border-white/25 hover:bg-white/[0.08]"
                      data-cursor="hover"
                    >
                      <span>Book a free consult</span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  </CalendlyPopup>
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
