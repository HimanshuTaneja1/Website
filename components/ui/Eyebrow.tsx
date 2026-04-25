import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mono flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-white/15" aria-hidden />
      <span>{children}</span>
    </div>
  );
}
