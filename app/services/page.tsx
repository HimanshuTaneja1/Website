import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { CalendlyPopup } from "@/components/calendly/CalendlyPopup";
import { GlowButton } from "@/components/ui/GlowButton";
import { FAQ } from "@/components/sections/FAQ";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Three ways to work with me: AI Strategy Sprint, Agentic Systems Build and Fractional AI Lead. Every engagement starts with a free 30-minute consult and an outcome-priced quote.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="pt-[12vh] pb-10">
        <div className="wrap">
          <SectionHeader
            eyebrow="Services"
            title={
              <>
                Three ways to work with me. <span className="text-[color:var(--ink-dim)]">Every one ships a system, not a slide deck.</span>
              </>
            }
            kicker="Pick the shape of engagement that fits your quarter. Pricing is indicative; firm quote after a 30-minute call."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <GlassCard key={s.id} className="flex h-full flex-col">
                <div className="mono flex items-center justify-between">
                  <span>{s.badge} / {s.duration}</span>
                </div>
                <h2 className="mt-6 font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.02em]">
                  {s.title}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.6] text-[color:var(--ink-dim)]">
                  {s.description}
                </p>
                <ul className="mt-5 space-y-2.5 text-[13px] text-[color:var(--ink-dim)]">
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
                    <GlowButton className="w-full" variant="outline">
                      Book a free 30-min consult
                      <ArrowUpRight size={14} />
                    </GlowButton>
                  </CalendlyPopup>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <SectionHeader
            eyebrow="How we price"
            title={
              <>
                Priced for your problem, <span className="text-[color:var(--ink-dim)]">not a template.</span>
              </>
            }
            kicker="Every business walks in with a different shape of problem — so every quote is different. The 30-minute consult is free and the quote is firm within 48 hours."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Free consult, firm quote",
                b: "We spend 30 minutes on the real problem — not a discovery pipeline. I come back with a scoped, outcome-priced quote in 48 hours. No pressure, no sales cadence.",
              },
              {
                t: "Outcome-priced scope",
                b: "Every engagement is scoped in writing with milestones, owners and success metrics. You always know what you're paying for — and you only pre-pay work that's been accepted.",
              },
              {
                t: "Clean exits",
                b: "Fractional retainers are 30-day cancel. Strategy engagements have a halfway check — walk away if it's not landing and you only pay for delivered work. No golden handcuffs.",
              },
            ].map((b) => (
              <GlassCard key={b.t}>
                <div className="font-display text-[18px] font-medium">{b.t}</div>
                <p className="mt-3 text-[14px] leading-[1.65] text-[color:var(--ink-dim)]">
                  {b.b}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
