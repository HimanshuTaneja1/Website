import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export function SectionHeader({
  eyebrow,
  title,
  kicker,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  kicker?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className={cn(align === "center" && "justify-center flex")}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="mt-5 font-display text-[clamp(28px,3.4vw,48px)] font-semibold leading-[1.04] tracking-[-0.035em] text-balance">
        {title}
      </h2>
      {kicker && (
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[color:var(--ink-dim)] text-pretty">
          {kicker}
        </p>
      )}
    </div>
  );
}
