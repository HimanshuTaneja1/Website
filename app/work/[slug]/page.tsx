import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User2 } from "lucide-react";
import { workBySlug, workList } from "@/lib/work";
import { buildMetadata } from "@/lib/seo";
import { WorkCover } from "@/components/work/WorkCover";
import { MermaidDiagram } from "@/components/work/MermaidDiagram";
import { CalendlyPopup } from "@/components/calendly/CalendlyPopup";
import { GlowButton } from "@/components/ui/GlowButton";
import { Eyebrow } from "@/components/ui/Eyebrow";

export async function generateStaticParams() {
  return workList.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = workBySlug[slug];
  if (!w) return buildMetadata({ title: "Case study not found" });
  return buildMetadata({
    title: w.title,
    description: w.summary,
    path: `/work/${w.slug}`,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const w = workBySlug[slug];
  if (!w) return notFound();
  const next = workBySlug[w.nextSlug] ?? workList[0];

  return (
    <article className="pt-[11vh]">
      <div className="wrap">
        <Link
          href="/work"
          className="mono inline-flex items-center gap-2 text-[color:var(--ink-dim)] hover:text-white"
        >
          <ArrowLeft size={12} /> All work
        </Link>

        <header className="mt-8 grid gap-10 md:grid-cols-[1fr_0.8fr]">
          <div>
            <Eyebrow>
              {w.eyebrow} — {w.year}
            </Eyebrow>
            <h1 className="mt-6 max-w-3xl font-display text-[clamp(32px,5vw,64px)] font-semibold leading-[1] tracking-[-0.04em]">
              {w.title}
            </h1>
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.65] text-[color:var(--ink-dim)]">
              {w.summary}
            </p>
          </div>
          <aside className="glass rounded-2xl p-5 text-[13px]">
            <Row label="Role" value={w.role} icon={<User2 size={12} />} />
            <Row label="Duration" value={w.duration} icon={<Clock size={12} />} />
            <Row label="Year" value={w.year} icon={<Calendar size={12} />} />
            <Row label="Client" value={w.client} />
            <div className="mt-4 border-t border-white/5 pt-4">
              <div className="mono mb-2">Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {w.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-[color:var(--ink-dim)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </header>

        <div className="mt-9 aspect-[16/9] overflow-hidden rounded-3xl border border-white/8">
          <WorkCover palette={w.palette} title={w.title} eyebrow={w.eyebrow} slug={w.slug} />
        </div>

        <section className="mt-10 grid grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] md:grid-cols-4">
          {w.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`p-6 ${i !== 0 ? "md:border-l md:border-white/5" : ""} ${
                i % 2 === 1 ? "border-l border-white/5" : ""
              } ${i >= 2 ? "border-t border-white/5 md:border-t-0" : ""}`}
            >
              <div className="font-display text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.03em]">
                {m.value}
              </div>
              <div className="mt-1 text-[12px] text-[color:var(--ink-dim)]">
                {m.label}
              </div>
            </div>
          ))}
        </section>

        <section className="mt-14 grid gap-8 md:grid-cols-[0.4fr_1fr]">
          <Eyebrow>The problem</Eyebrow>
          <div className="space-y-4">
            {w.problem.map((p, i) => (
              <p
                key={i}
                className="text-[17px] leading-[1.65] text-[color:var(--ink)]"
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-8 md:grid-cols-[0.4fr_1fr]">
          <Eyebrow>The approach</Eyebrow>
          <ol className="space-y-5">
            {w.approach.map((a, i) => (
              <li key={i} className="flex gap-4">
                <span
                  aria-hidden
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent)]"
                />
                <p className="text-[16px] leading-[1.65]">{a}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 grid gap-8 md:grid-cols-[0.4fr_1fr]">
          <Eyebrow>Architecture</Eyebrow>
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <MermaidDiagram chart={w.architecture} />
          </div>
        </section>

        <section className="mt-14 grid gap-8 md:grid-cols-[0.4fr_1fr]">
          <Eyebrow>Outcome</Eyebrow>
          <ul className="space-y-4">
            {w.outcome.map((o, i) => (
              <li
                key={i}
                className="flex gap-4 border-l-2 border-[color:var(--accent)] pl-4"
              >
                <p className="text-[17px] leading-[1.6]">{o}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 grid gap-8 md:grid-cols-[0.4fr_1fr]">
          <Eyebrow>What I owned end-to-end</Eyebrow>
          <ul className="grid gap-3 sm:grid-cols-2">
            {w.owned.map((o) => (
              <li
                key={o}
                className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-[14px]"
              >
                {o}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 mb-10 rounded-3xl border border-white/10 mesh-bg p-8 md:p-12">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mono">Next up</div>
              <h3 className="mt-2 font-display text-[clamp(24px,3vw,36px)] font-semibold tracking-[-0.03em]">
                {next.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={`/work/${next.slug}`}>
                <GlowButton variant="outline" size="lg">
                  Read next case study
                  <ArrowUpRight size={14} />
                </GlowButton>
              </Link>
              <CalendlyPopup>
                <GlowButton size="lg">Book a call</GlowButton>
              </CalendlyPopup>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}

function Row({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-2 last:border-b-0">
      <span className="mono flex items-center gap-2 text-[10px]">
        {icon}
        {label}
      </span>
      <span className="text-[color:var(--ink)]">{value}</span>
    </div>
  );
}
