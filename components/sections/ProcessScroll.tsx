"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process_ } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEP_ACCENTS = [
  { from: "#7c5cff", to: "#22d3ee" },
  { from: "#22d3ee", to: "#7c5cff" },
  { from: "#34d399", to: "#22d3ee" },
  { from: "#f59e0b", to: "#ff6ad5" },
  { from: "#ff6ad5", to: "#7c5cff" },
] as const;

export function ProcessScroll() {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const el = wrap.current;
    if (!el) return;

    const steps = el.querySelectorAll<HTMLElement>("[data-step]");
    const triggers: ScrollTrigger[] = [];
    steps.forEach((step, i) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          end: "bottom 38%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        })
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const accent = STEP_ACCENTS[active] ?? STEP_ACCENTS[0];

  return (
    <section className="section-pad relative">
      <div className="wrap">
        <SectionHeader
          eyebrow="Process"
          title={
            <>
              Five steps, <span className="text-[color:var(--ink-dim)]">zero theatre.</span>
            </>
          }
          kicker="How engagements actually run, from a discovery call to a system your team owns and extends."
        />

        <div ref={wrap} className="mt-10 grid gap-10 md:grid-cols-[1fr_0.95fr]">
          <div>
            {process_.map((s, i) => (
              <div
                key={s.n}
                data-step
                className="min-h-[62vh] border-t border-white/5 py-10 transition-all duration-700"
                style={{ opacity: active === i ? 1 : 0.35 }}
              >
                <h3 className="mt-0 font-display text-[clamp(34px,4.4vw,60px)] font-semibold leading-[1.02] tracking-[-0.035em]">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-lg text-[15px] leading-[1.6] text-[color:var(--ink-dim)]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>

          <aside className="relative hidden md:block">
            <div
              className="sticky top-[18vh] aspect-[4/5] w-full overflow-hidden rounded-3xl border bg-[color:var(--surface)]/60 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.8)]"
              style={{
                borderColor: `${accent.from}33`,
                transition: "border-color 1000ms ease",
              }}
            >
              {/* backdrop morphs per step */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(60% 60% at 50% 35%, ${accent.from}33, transparent 70%), radial-gradient(55% 55% at 75% 85%, ${accent.to}22, transparent 70%)`,
                  transition: "background 1200ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  maskImage:
                    "radial-gradient(80% 80% at 50% 50%, rgba(0,0,0,0.9), transparent 90%)",
                  WebkitMaskImage:
                    "radial-gradient(80% 80% at 50% 50%, rgba(0,0,0,0.9), transparent 90%)",
                }}
              />

              <div className="absolute left-5 top-5 z-10 flex items-center gap-3">
                <StepDial active={active} total={process_.length} accent={accent} />
                <div className="mono flex flex-col">
                  <span key={process_[active]?.title} className="stepTitleSwap text-white">
                    {process_[active]?.title.toUpperCase()}
                  </span>
                </div>
              </div>

              <VizLayer active={active === 0}>
                <DiscoverViz />
              </VizLayer>
              <VizLayer active={active === 1}>
                <DesignViz />
              </VizLayer>
              <VizLayer active={active === 2}>
                <BuildViz />
              </VizLayer>
              <VizLayer active={active === 3}>
                <DeployViz />
              </VizLayer>
              <VizLayer active={active === 4}>
                <CompoundViz />
              </VizLayer>

              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between">
                <div className="mono text-[10px] text-white/50">
                  {process_[active]?.title}
                </div>
                <div className="flex gap-1.5">
                  {process_.map((_, i) => (
                    <span
                      key={i}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        width: i === active ? 28 : 10,
                        background:
                          i === active
                            ? `linear-gradient(90deg, ${STEP_ACCENTS[i]?.from}, ${STEP_ACCENTS[i]?.to})`
                            : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

// ------------------------ Transition shell ------------------------

/**
 * Orchestrates smooth cross-fades between layers. Instead of a single hard
 * clip-path wipe we use a longer, overlapping opacity+scale+blur tween
 * with staggered child reveals — the outgoing viz fades out while the
 * incoming one fades in, creating a continuous flow rather than jump cuts.
 */
function VizLayer({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prev = useRef(active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const children = el.querySelectorAll<HTMLElement>("[data-viz-child]");
    gsap.killTweensOf([el, ...Array.from(children)]);

    if (active && !prev.current) {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          scale: 0.94,
          filter: "blur(10px)",
          y: 16,
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: reduce ? 0.001 : 1.1,
          ease: "power3.out",
        }
      );
      if (children.length && !reduce) {
        gsap.fromTo(
          children,
          { opacity: 0, y: 18, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "power2.out",
            stagger: 0.09,
            delay: 0.3,
          }
        );
      }
    } else if (!active && prev.current) {
      gsap.to(el, {
        opacity: 0,
        scale: 1.04,
        filter: "blur(8px)",
        y: -12,
        duration: 0.55,
        ease: "power2.in",
      });
    } else {
      gsap.set(el, {
        opacity: active ? 1 : 0,
        scale: active ? 1 : 1.04,
        filter: active ? "blur(0px)" : "blur(8px)",
      });
    }

    prev.current = active;
  }, [active]);

  return (
    <div
      ref={ref}
      aria-hidden={!active}
      className="absolute inset-0"
      style={{ pointerEvents: "none", opacity: 0 }}
    >
      {children}
    </div>
  );
}

function StepDial({
  active,
  total,
  accent,
}: {
  active: number;
  total: number;
  accent: { from: string; to: string };
}) {
  const pct = (active + 1) / total;
  const c = 2 * Math.PI * 16;
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9">
      <defs>
        <linearGradient id={`dialG-${active}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent.from} />
          <stop offset="100%" stopColor={accent.to} />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.12)" strokeWidth="2" fill="none" />
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke={`url(#dialG-${active})`}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        transform="rotate(-90 20 20)"
        style={{
          strokeDasharray: c,
          strokeDashoffset: c * (1 - pct),
          transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
    </svg>
  );
}

// ============================================================================
//  Per-step visualisations, each built to mirror the copy on the left.
// ============================================================================

// ---------- 01 Discover — interviews + data → ranked opportunity map ----------
function DiscoverViz() {
  const interviews = [
    { who: "CS lead", q: "We close 62 tickets a day — half are refunds." },
    { who: "Eng lead", q: "Our retries cost $18k/mo on tool calls alone." },
    { who: "CEO", q: "We win if the bot resolves without a human touch." },
  ];
  const map = [
    { label: "Refund agent", score: 92, roi: "£210k / yr" },
    { label: "Triage + routing", score: 78, roi: "£140k / yr" },
    { label: "Voice IVR copilot", score: 65, roi: "£90k / yr" },
    { label: "KB writer", score: 48, roi: "deferred" },
  ];

  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-4 p-8">
      {/* interviews column */}
      <div className="flex flex-col justify-center gap-3">
        {interviews.map((it, i) => (
          <div
            key={i}
            data-viz-child
            className="rounded-xl border border-white/10 bg-white/[0.04] p-3 shadow-[0_6px_20px_-10px_rgba(0,0,0,0.6)] backdrop-blur-sm"
          >
            <div className="mono mb-1 flex items-center gap-2 text-[9px] text-white/55">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#7c5cff]" />
              INTERVIEW · {it.who}
            </div>
            <div className="text-[11.5px] leading-[1.45] text-white/85">“{it.q}”</div>
          </div>
        ))}
      </div>

      {/* opportunity map column */}
      <div data-viz-child className="flex flex-col justify-center">
        <div className="mono mb-3 text-[9px] tracking-[0.2em] text-white/55">
          OPPORTUNITY MAP
        </div>
        <div className="space-y-2">
          {map.map((m, i) => (
            <div
              key={m.label}
              className="rounded-lg border border-white/10 bg-[#0b0d13]/80 p-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11.5px] text-white">{m.label}</span>
                <span className="mono text-[10px] text-white/55">#{i + 1}</span>
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <div className="h-1 flex-1 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${m.score}%`,
                      background: "linear-gradient(90deg, #7c5cff, #22d3ee)",
                      animation: `growBar 1s cubic-bezier(0.22,1,0.36,1) ${0.4 + i * 0.12}s both`,
                    }}
                  />
                </div>
                <span className="mono text-[9.5px] text-white/70">{m.roi}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* connecting arrows between columns */}
      <svg
        viewBox="0 0 600 600"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        {[0.28, 0.48, 0.68].map((y, i) => (
          <path
            key={i}
            d={`M 290 ${y * 600} C 330 ${y * 600}, 340 ${0.5 * 600}, 380 ${0.5 * 600}`}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            strokeDasharray="2 5"
            style={{ animation: `fadeIn 0.6s ${0.9 + i * 0.1}s both` }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes growBar { from { width: 0; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

// ---------- 02 Design — architecture blueprint with budgets ----------
function DesignViz() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <svg viewBox="0 0 500 500" className="h-full w-full" data-viz-child>
        <defs>
          <linearGradient id="blueprintG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#7c5cff" />
          </linearGradient>
        </defs>
        {/* outer frame w/ measure marks */}
        <g stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" strokeDasharray="2 4" fill="none">
          <line x1="80" y1="40" x2="80" y2="460" />
          <line x1="420" y1="40" x2="420" y2="460" />
          <line x1="40" y1="80" x2="460" y2="80" />
          <line x1="40" y1="420" x2="460" y2="420" />
        </g>
        <text x="250" y="30" textAnchor="middle" fontFamily="ui-monospace" fontSize="11" fill="rgba(255,255,255,0.7)" letterSpacing="3">
          ARCHITECTURE · v1.2
        </text>
        <text x="36" y="250" textAnchor="middle" fontFamily="ui-monospace" fontSize="10" fill="rgba(255,255,255,0.55)" transform="rotate(-90 36 250)" letterSpacing="2">
          contract
        </text>
        <text x="250" y="478" textAnchor="middle" fontFamily="ui-monospace" fontSize="10" fill="rgba(255,255,255,0.55)" letterSpacing="2">
          runbook
        </text>

        <g fill="none" stroke="url(#blueprintG)" strokeWidth="1.6" strokeLinejoin="round">
          <rect x="100" y="110" width="300" height="280" rx="10" strokeDasharray="1200" strokeDashoffset="1200">
            <animate attributeName="stroke-dashoffset" from="1200" to="0" dur="1.6s" fill="freeze" />
          </rect>
          <rect x="130" y="140" width="110" height="70" rx="6" stroke="#22d3ee" strokeDasharray="360" strokeDashoffset="360">
            <animate attributeName="stroke-dashoffset" from="360" to="0" dur="1.2s" begin="0.3s" fill="freeze" />
          </rect>
          <rect x="260" y="140" width="110" height="70" rx="6" stroke="#7c5cff" strokeDasharray="360" strokeDashoffset="360">
            <animate attributeName="stroke-dashoffset" from="360" to="0" dur="1.2s" begin="0.6s" fill="freeze" />
          </rect>
          <rect x="130" y="230" width="240" height="60" rx="6" stroke="#ff6ad5" strokeDasharray="600" strokeDashoffset="600">
            <animate attributeName="stroke-dashoffset" from="600" to="0" dur="1.4s" begin="0.9s" fill="freeze" />
          </rect>
          <rect x="130" y="310" width="240" height="60" rx="6" strokeDasharray="600" strokeDashoffset="600">
            <animate attributeName="stroke-dashoffset" from="600" to="0" dur="1.4s" begin="1.2s" fill="freeze" />
          </rect>
          <path d="M 250 210 L 250 230" strokeDasharray="0 60">
            <animate attributeName="stroke-dasharray" from="0 60" to="60 0" dur="0.5s" begin="1.5s" fill="freeze" />
          </path>
          <path d="M 250 290 L 250 310" strokeDasharray="0 60">
            <animate attributeName="stroke-dasharray" from="0 60" to="60 0" dur="0.5s" begin="1.7s" fill="freeze" />
          </path>
        </g>

        {[
          { x: 185, y: 180, t: "retrieve" },
          { x: 315, y: 180, t: "plan" },
          { x: 250, y: 265, t: "tools · memory" },
          { x: 250, y: 345, t: "critic · ship" },
        ].map((n, i) => (
          <text
            key={i}
            x={n.x}
            y={n.y}
            textAnchor="middle"
            fontFamily="ui-monospace"
            fontSize="10"
            fill="#fff"
            opacity="0"
          >
            <animate attributeName="opacity" from="0" to="0.95" dur="0.3s" begin={`${1.8 + i * 0.15}s`} fill="freeze" />
            {n.t}
          </text>
        ))}

        {/* budget annotations */}
        <g fontFamily="ui-monospace" fontSize="10">
          <g opacity="0">
            <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.4s" fill="freeze" />
            <text x="430" y="175" fill="rgba(255,255,255,0.55)">p95</text>
            <text x="430" y="190" fill="#34d399" fontWeight="700">&lt; 800ms</text>
          </g>
          <g opacity="0">
            <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.55s" fill="freeze" />
            <text x="430" y="265" fill="rgba(255,255,255,0.55)">cost</text>
            <text x="430" y="280" fill="#f59e0b" fontWeight="700">$0.02/req</text>
          </g>
          <g opacity="0">
            <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.7s" fill="freeze" />
            <text x="430" y="340" fill="rgba(255,255,255,0.55)">eval</text>
            <text x="430" y="355" fill="#22d3ee" fontWeight="700">≥ 95%</text>
          </g>
        </g>
      </svg>
    </div>
  );
}

// ---------- 03 Build — terminal + PR list (unchanged, resonates well) ----------
function BuildViz() {
  const lines = [
    { text: "$ pnpm test --eval", color: "#22d3ee" },
    { text: "→ 214/220 passed", color: "#34d399" },
    { text: "$ git commit -m 'ship: v3 eval gate'", color: "#fff" },
    { text: "✓ build ready", color: "#34d399" },
  ];
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
      <div
        data-viz-child
        className="relative w-full max-w-[380px] rounded-xl border border-white/15 bg-black/65 shadow-2xl"
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#ff6068]" />
          <span className="h-2 w-2 rounded-full bg-[#ffbd44]" />
          <span className="h-2 w-2 rounded-full bg-[#00ca4e]" />
          <span className="mono ml-2 text-[10px] text-white/50">~/agent · main</span>
        </div>
        <div className="space-y-1 p-4 font-mono text-[12px] leading-[1.5]">
          {lines.map((l, i) => (
            <div
              key={i}
              className="flex items-baseline gap-2"
              style={{
                color: l.color,
                animation: `typeFade 0.4s ease-out ${i * 0.45}s both`,
              }}
            >
              <span className="text-white/30">{String(i + 1).padStart(2, "0")}</span>
              <span
                className="inline-block overflow-hidden whitespace-nowrap"
                style={{
                  animation: `typeLine 1.1s steps(${l.text.length}) ${i * 0.45}s both`,
                  maxWidth: "100%",
                }}
              >
                {l.text}
              </span>
            </div>
          ))}
          <span
            className="inline-block h-3.5 w-1.5 align-middle"
            style={{
              background: "#22d3ee",
              animation: "caretBlink 1s steps(2) infinite",
            }}
          />
        </div>
      </div>

      <div data-viz-child className="w-full max-w-[380px] rounded-xl border border-white/12 bg-white/[0.02] p-3">
        <div className="mono mb-2 text-[10px] text-white/55">PULL REQUESTS · this week</div>
        {[
          { t: "feat: retrieve v2 (dense+bm25)", s: "merged" },
          { t: "fix: memory eviction race", s: "merged" },
          { t: "chore: eval harness upgrade", s: "review" },
        ].map((p, i) => (
          <div key={i} className="flex items-center justify-between py-1 text-[11px]">
            <span className="text-white/85">{p.t}</span>
            <span
              className={`mono text-[9px] ${
                p.s === "merged" ? "text-[#a78bfa]" : "text-[#f59e0b]"
              }`}
            >
              {p.s}
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes typeLine { from { width: 0; } to { width: 100%; } }
        @keyframes typeFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes caretBlink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

// ---------- 04 Deploy — shadow cutover (v1 ↔ v2) with live metrics ----------
function DeployViz() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
      <div data-viz-child className="w-full max-w-[400px]">
        <div className="mono mb-3 flex items-center justify-between text-[10px] text-white/55">
          <span>SHADOW CUTOVER</span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#34d399", boxShadow: "0 0 8px #34d399", animation: "consolePulse 1.6s ease-in-out infinite" }}
            />
            LIVE
          </span>
        </div>

        {/* traffic split bar */}
        <div className="relative h-12 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
          <div
            className="absolute inset-y-0 left-0 flex items-center justify-start pl-3 text-[11px] font-semibold text-white"
            style={{
              width: "35%",
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))",
              borderRight: "1px dashed rgba(255,255,255,0.3)",
              animation: "shrinkV1 4s cubic-bezier(0.22,1,0.36,1) forwards",
            }}
          >
            <span className="mono text-[10px] text-white/80">v1 · 35%</span>
          </div>
          <div
            className="absolute inset-y-0 right-0 flex items-center justify-end pr-3 text-[11px] font-semibold text-white"
            style={{
              width: "65%",
              background: "linear-gradient(90deg, #7c5cff33, #22d3ee55)",
              animation: "growV2 4s cubic-bezier(0.22,1,0.36,1) forwards",
            }}
          >
            <span className="mono text-[10px] text-white">v2 · 65%</span>
          </div>
        </div>
      </div>

      {/* metric comparison */}
      <div data-viz-child className="grid w-full max-w-[400px] grid-cols-2 gap-3">
        {[
          { k: "cycle time", v1: "14m", v2: "2m", delta: "-86%", ok: true },
          { k: "CSAT", v1: "72", v2: "91", delta: "+26%", ok: true },
          { k: "$ per case", v1: "$3.40", v2: "$0.42", delta: "-88%", ok: true },
          { k: "escalations", v1: "18%", v2: "6%", delta: "-67%", ok: true },
        ].map((m) => (
          <div
            key={m.k}
            className="rounded-lg border border-white/10 bg-[#0b0d13]/80 p-2.5"
          >
            <div className="mono text-[9px] tracking-[0.15em] text-white/55">
              {m.k.toUpperCase()}
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <div className="flex items-baseline gap-1">
                <span className="mono text-[10px] text-white/50 line-through">{m.v1}</span>
                <span className="font-display text-[16px] font-semibold text-white">{m.v2}</span>
              </div>
              <span
                className="mono text-[10px] font-semibold"
                style={{ color: m.ok ? "#34d399" : "#ff6068" }}
              >
                {m.delta}
              </span>
            </div>
            {/* mini sparkline */}
            <svg viewBox="0 0 120 24" className="mt-1 h-4 w-full">
              <polyline
                points="0,18 20,16 40,14 60,10 80,8 100,4 120,2"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: 200,
                  animation: `drawSpark 1.4s cubic-bezier(0.22,1,0.36,1) 0.6s forwards`,
                }}
              />
            </svg>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes shrinkV1 { 0% { width: 100%; } 100% { width: 35%; } }
        @keyframes growV2 { 0% { width: 0%; } 100% { width: 65%; } }
        @keyframes drawSpark { to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}

// ---------- 05 Compound — layered bets stacking into total value ----------
function CompoundViz() {
  // Each "bet" is a coloured area. They stack so later bets sit on top of
  // the previous ones — visually mirroring the "we layer the next bet on
  // top" copy.
  const bets = [
    { name: "Refund agent", color: "#7c5cff", d: "M 60 420 Q 170 415 250 390 T 450 320 L 450 420 L 60 420 Z", delay: 0.2 },
    { name: "Triage + routing", color: "#22d3ee", d: "M 60 390 Q 170 380 250 350 T 450 240 L 450 320 Q 300 350 250 360 T 60 390 Z", delay: 0.9 },
    { name: "Voice IVR copilot", color: "#34d399", d: "M 60 360 Q 170 345 250 300 T 450 160 L 450 240 Q 310 270 250 290 T 60 360 Z", delay: 1.6 },
    { name: "KB writer", color: "#ff6ad5", d: "M 60 330 Q 170 305 250 240 T 450 80 L 450 160 Q 310 200 250 230 T 60 330 Z", delay: 2.3 },
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
      <svg viewBox="0 0 500 500" className="h-full w-full" data-viz-child>
        <defs>
          {bets.map((b, i) => (
            <linearGradient key={i} id={`betG-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={b.color} stopOpacity="0.55" />
              <stop offset="100%" stopColor={b.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        <g stroke="rgba(255,255,255,0.22)" strokeWidth="1">
          <line x1="60" y1="420" x2="450" y2="420" />
          <line x1="60" y1="80" x2="60" y2="420" />
        </g>
        {[0.25, 0.5, 0.75].map((r) => (
          <line
            key={r}
            x1="60"
            y1={80 + (420 - 80) * r}
            x2="450"
            y2={80 + (420 - 80) * r}
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="2 4"
          />
        ))}

        {bets.map((b, i) => (
          <path
            key={b.name}
            d={b.d}
            fill={`url(#betG-${i})`}
            stroke={b.color}
            strokeWidth="1.6"
            strokeLinejoin="round"
            style={{
              opacity: 0,
              transformOrigin: "250px 420px",
              animation: `stackIn 0.9s cubic-bezier(0.22,1,0.36,1) ${b.delay}s forwards`,
            }}
          />
        ))}

        <text x="60" y="64" fontFamily="ui-monospace" fontSize="11" fill="rgba(255,255,255,0.85)" letterSpacing="1.5">
          COMPOUNDING BETS · quarterly
        </text>
        <text x="450" y="440" textAnchor="end" fontFamily="ui-monospace" fontSize="10" fill="rgba(255,255,255,0.55)" letterSpacing="1.5">
          time →
        </text>
        {/* today marker */}
        <g style={{ opacity: 0, animation: "fadeIn 0.5s 3.2s forwards" }}>
          <line x1="440" y1="80" x2="440" y2="420" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 3" />
          <text x="435" y="74" textAnchor="end" fontFamily="ui-monospace" fontSize="10" fill="#fff">
            today
          </text>
        </g>

        <style>{`
          @keyframes stackIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
      </svg>

      {/* legend */}
      <div data-viz-child className="mt-2 grid w-full max-w-[420px] grid-cols-2 gap-1.5 pl-6 text-[10.5px]">
        {bets.map((b) => (
          <div key={b.name} className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-6 rounded-full"
              style={{ background: b.color, boxShadow: `0 0 8px ${b.color}66` }}
            />
            <span className="text-white/80">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
