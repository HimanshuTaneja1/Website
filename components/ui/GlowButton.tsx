import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
};

export const GlowButton = forwardRef<HTMLButtonElement, Props>(function GlowButton(
  { className, variant = "primary", size = "md", children, ...rest },
  ref
) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 will-change-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none";

  const sizes =
    size === "lg" ? "h-12 px-6 text-[14px]" : "h-10 px-5 text-[13px]";

  const variants = {
    primary:
      "bg-white text-black shadow-[0_16px_60px_-12px_rgba(124,92,255,0.55)] hover:shadow-[0_24px_80px_-12px_rgba(124,92,255,0.7)]",
    outline:
      "border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08]",
    ghost: "text-white hover:bg-white/[0.06]",
  }[variant];

  return (
    <button ref={ref} className={cn(base, sizes, variants, className)} data-cursor="hover" {...rest}>
      {children}
    </button>
  );
});
