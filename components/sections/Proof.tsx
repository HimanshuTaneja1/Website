import { proof, stackLogos } from "@/lib/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MarqueeLogos } from "@/components/ui/MarqueeLogos";

export function Proof() {
  return (
    <section className="section-pad relative">
      <div className="wrap">
        <SectionHeader
          eyebrow="Proof"
          title={
            <>
              Numbers I can show you, <span className="text-[color:var(--ink-dim)]">and a stack I have shipped in production.</span>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-0 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] md:grid-cols-4">
          {proof.map((p, i) => (
            <div
              key={p.label}
              className={`relative p-6 md:p-8 ${
                i !== 0 ? "md:border-l md:border-white/5" : ""
              } ${i % 2 === 1 ? "border-l border-white/5" : ""} ${
                i >= 2 ? "border-t border-white/5 md:border-t-0" : ""
              }`}
            >
              <div className="font-display text-[clamp(34px,4vw,56px)] font-semibold leading-[1] tracking-[-0.035em]">
                {p.n}
              </div>
              <div className="mt-2 text-[13px] text-[color:var(--ink-dim)]">
                {p.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="mono mb-5">{stackLogos.length} tools I ship with</div>
          <MarqueeLogos />
        </div>
      </div>
    </section>
  );
}
