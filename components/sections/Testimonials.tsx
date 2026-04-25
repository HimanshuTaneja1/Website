import { testimonials } from "@/lib/site";
import { Quote } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Testimonials() {
  return (
    <section className="section-pad relative">
      <div className="wrap">
        <SectionHeader
          eyebrow="Testimonials"
          title={
            <>
              The short version from <span className="text-[color:var(--ink-dim)]">the operators I worked with.</span>
            </>
          }
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="glass relative flex h-full flex-col rounded-2xl p-6"
            >
              <Quote
                size={24}
                className="text-[color:var(--accent)] opacity-70"
              />
              <blockquote className="mt-5 font-display text-[17px] leading-[1.45] tracking-[-0.01em]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-6">
                <div className="text-[13px] font-medium">{t.name}</div>
                <div className="mono mt-1">{t.meta}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
