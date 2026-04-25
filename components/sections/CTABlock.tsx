import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { CalendlyPopup } from "@/components/calendly/CalendlyPopup";
import { GlowButton } from "@/components/ui/GlowButton";

export function CTABlock() {
  return (
    <section className="section-pad relative">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 p-10 md:p-16 mesh-bg">
          <div
            aria-hidden
            className="absolute -right-20 -top-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-60 spin-slow"
            style={{
              background:
                "conic-gradient(from 180deg at 50% 50%, #7c5cff, #22d3ee, #ff6ad5, #7c5cff)",
            }}
          />
          <div className="relative flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mono">08 / Let&apos;s talk</div>
              <h2 className="mt-4 font-display text-[clamp(36px,5vw,72px)] font-semibold leading-[0.98] tracking-[-0.04em]">
                Let&apos;s compound your next quarter.
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.6] text-[color:var(--ink-dim)]">
                Thirty minutes is enough to know if there&apos;s a fit. Walk in
                with the ambiguity, walk out with the first three bets.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <CalendlyPopup>
                <GlowButton size="lg">
                  Book a 30-min strategy call
                  <ArrowUpRight size={16} />
                </GlowButton>
              </CalendlyPopup>
              <Link
                href={`mailto:${site.email}?subject=AI%20Consulting%20Inquiry`}
              >
                <GlowButton size="lg" variant="outline">
                  <Mail size={14} />
                  Email {site.email}
                </GlowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
