import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workList } from "@/lib/work";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCover } from "@/components/work/WorkCover";

export function SelectedWork() {
  return (
    <section id="selected-work" className="section-pad relative">
      <div className="wrap">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Selected work"
            title={
              <>
                Six production systems, <span className="text-[color:var(--ink-dim)]">and the P&amp;L behind each one.</span>
              </>
            }
            kicker="Every project ships with measured outcomes. Pick one to see the architecture, the trade-offs I made, and what I owned end-to-end."
          />
          <Link
            href="/work"
            className="mono inline-flex items-center gap-2 text-[color:var(--ink-dim)] hover:text-white"
          >
            View all
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
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
                  {w.eyebrow}
                </div>
              </div>
              <div className="flex items-start justify-between gap-6 p-6">
                <div>
                  <h3 className="font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.02em]">
                    {w.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-[color:var(--ink-dim)]">
                    {w.stack.slice(0, 4).map((s) => (
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
