import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const GlassCard = forwardRef<HTMLDivElement, Props>(function GlassCard(
  { className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-xl",
        className
      )}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px 180px at var(--mx,50%) var(--my,0%), rgba(124,92,255,0.18), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
});
