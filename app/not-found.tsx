import Link from "next/link";
import { ArrowUpRight, MoveRight } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-[12vh]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full spin-slow blur-3xl opacity-50"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, #7c5cff, #22d3ee, #ff6ad5, #7c5cff)",
        }}
      />
      <div className="wrap relative">
        <div className="mono">404 · not found</div>
        <h1 className="mt-6 max-w-3xl font-display text-[clamp(48px,8vw,120px)] font-semibold leading-[0.98] tracking-[-0.045em]">
          This page is an <span className="gradient-text">eval failure.</span>
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-[1.6] text-[color:var(--ink-dim)]">
          The path you followed didn&apos;t pass the grounding test. Let&apos;s
          get you somewhere useful.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/">
            <GlowButton size="lg">
              Back to home <MoveRight size={14} />
            </GlowButton>
          </Link>
          <Link href="/work">
            <GlowButton size="lg" variant="outline">
              See case studies <ArrowUpRight size={14} />
            </GlowButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
