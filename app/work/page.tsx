import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workList } from "@/lib/work";
import { buildMetadata } from "@/lib/seo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCover } from "@/components/work/WorkCover";

export const metadata: Metadata = buildMetadata({
  title: "Selected Work",
  description:
    "Production AI systems I have shipped — RAG copilots, voice agents, agentic automations and more. Every case study ships with outcomes, not screenshots.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <section className="pt-[12vh] pb-14">
      <div className="wrap">
        <SectionHeader
          eyebrow="Work"
          title={
            <>
              Six systems in production. <span className="text-[color:var(--ink-dim)]">One common thread: measurable outcomes.</span>
            </>
          }
          kicker="Each case study covers the problem, the architecture, what I owned, and the numbers that came out the other side."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
            {workList.map((w) => (
            <Link
              key={w.slug}
              href={`/work/${w.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] transition-all hover:border-white/15"
              data-cursor="hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
                  <WorkCover
                    palette={w.palette}
                    title={w.title}
                    eyebrow={w.eyebrow}
                    slug={w.slug}
                  />
                </div>
                <div className="absolute left-5 top-5 mono text-white/85">
                  {w.year}
                </div>
              </div>
              <div className="flex items-start justify-between gap-6 p-6">
                <div>
                  <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.02em]">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.55] text-[color:var(--ink-dim)]">
                    {w.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-[color:var(--ink-dim)]">
                    {w.stack.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/8 px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 transition-transform group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
