"use client";

import { ArrowDown, ArrowUpRight, MoveRight } from "lucide-react";
import { CalendlyPopup } from "@/components/calendly/CalendlyPopup";
import { GlowButton } from "@/components/ui/GlowButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { HeroVisual } from "./HeroVisual";

const PROOF_STATS: { label: string; value: string; color: string }[] = [
  { label: "revenue impact", value: "£4.2M+", color: "#a78bfa" },
  { label: "systems shipped", value: "18", color: "#22d3ee" },
  { label: "ship window", value: "< 90 days", color: "#34d399" },
];

export function Hero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden">
      {/* ambient background */}
      <div aria-hidden className="absolute inset-0 bg-[color:var(--bg)]" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 30% 20%, rgba(124,92,255,0.18), transparent 60%), radial-gradient(70% 60% at 80% 80%, rgba(34,211,238,0.12), transparent 65%), radial-gradient(50% 50% at 50% 100%, rgba(255,106,213,0.08), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 line-grid opacity-[0.18]"
        style={{
          maskImage:
            "radial-gradient(80% 70% at 50% 45%, rgba(0,0,0,0.85), transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(80% 70% at 50% 45%, rgba(0,0,0,0.85), transparent 90%)",
        }}
      />

      <div className="relative z-10 flex min-h-[92svh] flex-col">
        <div className="wrap flex-1 pt-[11vh] pb-6">
          <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative order-2 md:order-1">
              <HeroVisual />
            </div>

            <div className="order-1 md:order-2 hero-reveal">
              {/* now-booking pill */}
              <div className="mono inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-3 py-1.5 text-[10.5px] tracking-[0.18em] text-emerald-200/90">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                TAKING NEW ENGAGEMENTS
              </div>

              <div className="mt-4">
                <Eyebrow>AI BUSINESS CONSULTANT</Eyebrow>
              </div>

              <h1 className="mt-4 font-display font-semibold text-[clamp(38px,5.2vw,82px)] leading-[0.98] tracking-[-0.04em]">
                <SplitReveal as="span" className="block">
                  I turn AI hype into
                </SplitReveal>
                <SplitReveal as="span" className="block gradient-text" delay={0.2}>
                  P&amp;L line items.
                </SplitReveal>
              </h1>

              <p className="mt-5 max-w-xl text-[15.5px] leading-[1.6] text-[color:var(--ink-dim)] text-pretty">
                Fractional AI lead and done-with-you builder for operators who
                want revenue, not research. Production RAG, agentic systems and
                LLM infrastructure that pays for itself inside a quarter.
              </p>

              {/* proof strip */}
              <ul className="mt-6 grid max-w-xl grid-cols-3 gap-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
                {PROOF_STATS.map((s, i) => (
                  <li
                    key={s.label}
                    className={`px-3 py-2.5 ${i > 0 ? "border-l border-white/5" : ""}`}
                  >
                    <div
                      className="font-display text-[18px] font-semibold leading-none tracking-[-0.025em]"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </div>
                    <div className="mono mt-1.5 text-[9.5px] tracking-[0.14em] text-white/55">
                      {s.label.toUpperCase()}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <CalendlyPopup>
                  <GlowButton size="lg">
                    Book a 30-min strategy call
                    <ArrowUpRight size={16} />
                  </GlowButton>
                </CalendlyPopup>
                <a href="#selected-work">
                  <GlowButton size="lg" variant="outline">
                    See case studies
                    <MoveRight size={16} />
                  </GlowButton>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap pb-6">
          <div className="flex items-center justify-end">
            <a
              href="#why-now"
              aria-label="Scroll to next section"
              className="inline-flex items-center gap-2 text-[12px] text-[color:var(--ink-dim)] hover:text-white"
            >
              <span className="mono">Scroll</span>
              <span className="relative block h-8 w-4 rounded-full border border-white/20">
                <span className="scroll-cue-dot absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white" />
              </span>
              <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
