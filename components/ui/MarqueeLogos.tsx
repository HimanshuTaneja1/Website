import { stackLogos } from "@/lib/site";

export function MarqueeLogos() {
  const items = [...stackLogos, ...stackLogos];
  return (
    <div className="relative overflow-hidden">
      <div className="marquee-track flex min-w-max items-center gap-10 whitespace-nowrap">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-3 text-[15px] font-medium tracking-tight text-[color:var(--ink-dim)]"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-white/25"
            />
            {label}
          </span>
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--bg)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--bg)] to-transparent"
      />
    </div>
  );
}
