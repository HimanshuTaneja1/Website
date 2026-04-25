import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ProcessScroll } from "@/components/sections/ProcessScroll";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = buildMetadata({
  title: "Process",
  description:
    "How engagements run: discover, design, build, deploy and compound. Five steps, zero theatre.",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <section className="pt-[12vh]">
        <div className="wrap">
          <SectionHeader
            eyebrow="Process"
            title={
              <>
                How engagements actually run. <span className="text-[color:var(--ink-dim)]">From a Monday kickoff to a system your team owns.</span>
              </>
            }
            kicker="My engagements are engineered like the systems I ship: clear contracts, measurable gates, reversible decisions. Below is the whole thing, unabridged."
          />
        </div>
      </section>

      <ProcessScroll />

      <section className="section-pad">
        <div className="wrap">
          <SectionHeader
            eyebrow="Working agreement"
            title={
              <>
                Defaults that <span className="text-[color:var(--ink-dim)]">keep us moving.</span>
              </>
            }
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Async first",
                b: "One written update per week, with diffs and metrics. Meetings only when a written thread stops working.",
              },
              {
                t: "Small, often, flagged",
                b: "Small PRs merged daily, behind feature flags. You always have a deployable main, even on day two.",
              },
              {
                t: "Evals are the gate",
                b: "Every customer-facing change passes an eval harness. A red eval blocks release — no exceptions for CEOs.",
              },
              {
                t: "Reversible actions",
                b: "Anything an agent does to a system of record is reversible by default. We earn trust before we remove the undo button.",
              },
              {
                t: "Exec-ready metrics",
                b: "Weekly dashboards show $ moved, latency, cost per run and eval pass-rate. Your CFO should be able to read them without translation.",
              },
              {
                t: "Clean handoff",
                b: "Every engagement ends with docs, runbooks and Loom walkthroughs. Your team owns the system on day one after I leave.",
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
    </>
  );
}
