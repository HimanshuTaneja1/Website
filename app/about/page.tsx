import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MarqueeLogos } from "@/components/ui/MarqueeLogos";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Ex-operator, current builder. I have shipped AI into production for SaaS, media and e-commerce — with measurable ROI.",
  path: "/about",
});

const timeline = [
  {
    year: "2026",
    title: "Fractional AI Lead, two Series A SaaS",
    body: "Owning AI roadmap and hiring. Shipping agentic systems that pay for themselves inside the quarter.",
  },
  {
    year: "2025",
    title: "Principal consultant, RAG + voice",
    body: "Led production RAG rollouts and Vapi voice-agent platforms across UK/EU SaaS and media clients.",
  },
  {
    year: "2024",
    title: "Founding AI engineer, ops automation",
    body: "Built an agentic SaaS from zero to $410k ARR in seven months. Shipped billing, auth, evals and observability.",
  },
  {
    year: "2023",
    title: "Head of Engineering, e-commerce",
    body: "Ran a 14-person team, put the first agents behind the ops desk, and cut ticket volume by two thirds.",
  },
  {
    year: "2021",
    title: "Staff engineer, data platforms",
    body: "Led a five-year replatforming: warehouses, ML pipelines, and the first internal LLM tooling.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="pt-[12vh] pb-10">
        <div className="wrap">
          <SectionHeader
            eyebrow="About"
            title={
              <>
                Ex-operator, current builder. <span className="text-[color:var(--ink-dim)]">I have shipped AI into production for SaaS, media and e-commerce.</span>
              </>
            }
            kicker={`I am ${site.name}, based in ${site.location}. I spent a decade inside product and engineering teams before going independent in 2024. Everything on this site is work I owned, mostly from the first line of code to the post-launch retro.`}
          />

          <div className="mt-10 grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <GlassCard className="p-8">
              <div className="mono">Philosophy</div>
              <h3 className="mt-4 font-display text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                Boring systems. Opinionated agents. Ruthless evals.
              </h3>
              <p className="mt-4 text-[14px] leading-[1.7] text-[color:var(--ink-dim)]">
                My bias is toward the smallest system that could possibly work.
                I&apos;d rather ship a narrow agent with a reversible action
                pattern than a general-purpose demo. Evals are how I sleep at
                night — every production system I&apos;ve shipped has a
                regression harness that gates releases.
              </p>
              <p className="mt-4 text-[14px] leading-[1.7] text-[color:var(--ink-dim)]">
                Opinions are cheap; cost, latency and observability are not. I
                budget every bet in tokens, wall-time and on-call risk before
                the first PR lands.
              </p>
            </GlassCard>
            <GlassCard className="p-8">
              <div className="mono">How I work</div>
              <ul className="mt-4 space-y-3.5 text-[14px] leading-[1.6] text-[color:var(--ink-dim)]">
                <li>Weekly written updates with diffs, metrics and open risks.</li>
                <li>Small PRs, merged often, behind feature flags.</li>
                <li>Every customer-facing change passes an eval gate.</li>
                <li>No demoware: if it&apos;s not on main, it doesn&apos;t exist.</li>
                <li>One long async post per week over a meeting, by default.</li>
                <li>Quarterly exec readouts with $ moved, not screenshots.</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <SectionHeader
            eyebrow="Trajectory"
            title={
              <>
                A decade of shipping — <span className="text-[color:var(--ink-dim)]">five years of it with AI in production.</span>
              </>
            }
          />
          <ol className="mt-8 space-y-2">
            {timeline.map((t) => (
              <li
                key={t.year}
                className="grid gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:grid-cols-[100px_1fr] md:items-start"
              >
                <div className="mono text-[color:var(--ink)]">{t.year}</div>
                <div>
                  <div className="font-display text-[18px] font-medium tracking-[-0.01em]">
                    {t.title}
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.65] text-[color:var(--ink-dim)]">
                    {t.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad">
        <div className="wrap">
          <SectionHeader
            eyebrow="Stack"
            title={
              <>
                The tools I reach for — <span className="text-[color:var(--ink-dim)]">and the ones I have earned scars with.</span>
              </>
            }
          />
          <div className="mt-10">
            <MarqueeLogos />
          </div>
          <div className="mt-6 grid gap-4 text-[13px] text-[color:var(--ink-dim)] sm:grid-cols-3">
            <div>
              <div className="mono mb-2">Frontend</div>
              Next.js 15, React 19, Tailwind, Framer Motion, Three.js
            </div>
            <div>
              <div className="mono mb-2">AI / agents</div>
              OpenAI, Anthropic, LangGraph, Pinecone, Vapi, evals harnesses
            </div>
            <div>
              <div className="mono mb-2">Infra</div>
              Vercel, AWS, Neon, Inngest, Temporal, CloudFront, Clerk/Better Auth
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
